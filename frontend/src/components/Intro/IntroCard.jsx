import React from "react";

/**
 * IntroCard
 * Shows profile image + name only.
 */

export default function IntroCard({ name = "Your Name", profileImage }) {
  const url = profileImage?.url || profileImage || "/placeholder-profile.png";

  return (
    <div className="intro-card">
      <div className="intro-card-img profile-img-wrapper">
        <img src={url} alt={name} className="profile-img" />
      </div>
      <h3 className="intro-card-name">{name}</h3>
    </div>
  );
}
