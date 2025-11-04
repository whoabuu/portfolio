/**
 * A reusable CTA button component.
 * When an 'href' prop is provided (e.g., "#contact"),
 * it scrolls smoothly to that section.
 * If 'href' is an external link (e.g., "https://...") or not provided,
 * it will act like a normal link.
 */

const Button = ({ text, className, href }) => {
  const handleClick = (e) => {
    // 1. Only run smooth-scroll logic if href is an ID (e.g., "#contact")
    if (href && href.startsWith("#")) {
      e.preventDefault(); // Stop the link from jumping instantly

      // 2. Get the ID name from the href
      const targetId = href.substring(1); // "contact"
      const target = document.getElementById(targetId);

      // 3. Only scroll if we found the target
      if (target) {
        const offset = window.innerHeight * 0.15; // Leave a bit of space at the top

        // Calculate how far down the page we need to scroll
        const top =
          target.getBoundingClientRect().top + window.pageYOffset - offset;

        // Scroll smoothly to that position
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
    // 4. If 'href' is a normal link or not provided,
    // the <a> tag will just behave normally.
  };

  return (
    <a
      href={href || "#"} // Fallback href for accessibility
      onClick={handleClick}
      className={`${className ?? ""} cta-wrapper`} // Add base + extra class names
    >
      <div className="cta-button group">
        <div className="bg-circle" />
        <p className="text">{text}</p>
        <div className="arrow-wrapper">
          <img src="/images/arrow-down.svg" alt="arrow" />
        </div>
      </div>
    </a>
  );
};

export default Button;