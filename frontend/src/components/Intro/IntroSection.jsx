import React, { useContext, useEffect, useMemo, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import IntroCard from "./IntroCard";
import IntroEditForm from "./IntroEditForm";
import "../../assets/styles/intro.css";

export default function IntroSection({
  intro,
  isAdmin = false,
  onUpdateIntro = () => {},
  onEdit: externalEdit,
} = {}) {
  const { theme } = useContext(ThemeContext);

  // 🔥 All hooks at the top (safe)
  const [showEdit, setShowEdit] = useState(false);
  const [localIntro, setLocalIntro] = useState(intro || null);

  useEffect(() => {
    setLocalIntro(intro || null);
  }, [intro]);

  // Always calculate bioLines, even if intro is null
  const bioLines = useMemo(() => {
    if (!localIntro || !Array.isArray(localIntro.bioLines)) {
      return ["A creator", "A developer", "A Blender enthusiast"];
    }
    return localIntro.bioLines.length > 0
      ? localIntro.bioLines
      : ["A creator", "A developer", "A Blender enthusiast"];
  }, [localIntro]);

  // typing effect states
  const [displayedText, setDisplayedText] = useState(bioLines[0] || "");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [typing, setTyping] = useState(true);

  // typing useEffect
  useEffect(() => {
    if (!bioLines || bioLines.length === 0) return;

    let mounted = true;
    const currentLine = bioLines[lineIndex % bioLines.length];

    if (localIntro?.bioTypingEffect === false) {
      const t = setInterval(() => {
        if (!mounted) return;
        setLineIndex((i) => (i + 1) % bioLines.length);
        setDisplayedText(
          bioLines[(lineIndex + 1) % bioLines.length]
        );
      }, 3000);

      return () => {
        mounted = false;
        clearInterval(t);
      };
    }

    const TYPING_SPEED = 40;
    const PAUSE_AFTER = 1200;
    const ERASE_SPEED = 30;

    let timeout;

    function tick() {
      if (!mounted) return;

      const line = bioLines[lineIndex % bioLines.length];

      if (typing) {
        if (charIndex < line.length) {
          setDisplayedText(line.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
          timeout = setTimeout(tick, TYPING_SPEED);
        } else {
          timeout = setTimeout(() => {
            setTyping(false);
            timeout = setTimeout(tick, ERASE_SPEED);
          }, PAUSE_AFTER);
        }
      } else {
        if (charIndex > 0) {
          setDisplayedText(line.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
          timeout = setTimeout(tick, ERASE_SPEED);
        } else {
          setTyping(true);
          setLineIndex((i) => (i + 1) % bioLines.length);
          timeout = setTimeout(tick, TYPING_SPEED);
        }
      }
    }

    timeout = setTimeout(tick, 200);

    return () => {
      mounted = false;
      clearTimeout(timeout);
    };
  }, [bioLines, lineIndex, charIndex, localIntro?.bioTypingEffect]);

  // 🟪 After all hooks → Now safe to check intro and render
  if (!localIntro) {
    return (
      <section className="intro-hero placeholder">
        <div className="container">
          <div style={{ padding: 24 }}>
            <h2>Loading intro...</h2>
          </div>
        </div>
      </section>
    );
  }

  const bg =
    localIntro.backgroundMedia?.url ||
    localIntro.backgroundFallback?.url ||
    "";

  const bgType =
    localIntro.backgroundMedia?.type ||
    localIntro.backgroundFallback?.type ||
    "image";

  return (
    <>
      <section className="intro-hero" style={{ minHeight: "56vh" }}>
        {bg ? (
          bgType === "video" ? (
            <video className="intro-bg-video" src={bg} autoPlay muted loop />
          ) : (
            <div className="intro-bg-image" style={{ backgroundImage: `url(${bg})` }} />
          )
        ) : (
          <div className="intro-bg-empty" />
        )}

        <div
          className="intro-overlay"
          style={{
            background: `rgba(0,0,0,${
              typeof localIntro.overlayOpacity === "number"
                ? localIntro.overlayOpacity
                : 0.35
            })`,
          }}
        />

        <div className="intro-inner container">
          <div className="intro-left">
            <IntroCard
              name={localIntro.name}
              profileImage={localIntro.profileImage}
            />
          </div>

          <div className="intro-right">
            <div className="intro-bio">
              {/* <h2 className="intro-name">{localIntro.name}</h2> */}

              <div className="intro-typing">
                <span>{displayedText}</span>
                <span className="typing-cursor">|</span>
              </div>

              <p className="intro-desc">{localIntro.description}</p>

              <div className="intro-links">
                {(localIntro.links || []).map((l, i) => (
                  <a key={i} href={l.url} target="_blank" rel="noreferrer">
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {isAdmin && (
          <button className="intro-edit-btn" onClick={() => setShowEdit(true)}>
            ✎
          </button>
        )}
      </section>

      {showEdit && (
        <IntroEditForm
          initialData={localIntro}
          onClose={() => setShowEdit(false)}
          onSaved={(updated) => {
            setLocalIntro(updated);
            setShowEdit(false);
            onUpdateIntro(updated);
          }}
        />
      )}
    </>
  );
}
