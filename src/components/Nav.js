
import React from 'react';

const Nav = () => {
  return (
    <nav class="navbar navbar-expand-lg">
      <a class="navbar-brand" href="#">
        BTZ - Drum
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"/>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul id="menuItems" class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link" href="https://www.linkedin.com/in/benjwexler/" target="_blank">Created by Ben Wexler
              <span class="sr-only">(current)</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Nav;
