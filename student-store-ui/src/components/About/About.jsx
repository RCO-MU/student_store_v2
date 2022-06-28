import * as React from 'react';
import './About.css';

export default function About() {
  return (
    <div id="about-us">
      <div id="About" />
      <h1 className="about-us-title">About Us</h1>
      <div className="about-us-content">
        <p>
          {`The Student Store™ offers "great products" (they're okay) at "great prices" 
                  (sorry for the inflation) from a "great team" (one developer) 
                  and for a "great cause" (my bank account).`}
        </p>
        <p>
          {`We've searched "far and wide" (fetched from a premade API) for items 
                  that perk the interests of even the most eccentric students and decided to 
                  "offer them" (you can't actually buy these items) all here in one "place" 
                  (not actually real).`}
        </p>
        <p>
          {`All "proceeds" (again, you can't actually pay) go towards bringing "high quality CS
                  education" (paying my college tuition) to "college students" (just me) "around the country" (one place).`}
        </p>
      </div>
    </div>

  );
}
