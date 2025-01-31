import React from "react";
import "./App.css";

function App() {
  return (
    <div class="main">
      <nav className="nav">
        <div className="logo">Your <strong id="Bhai">Logo</strong></div>
        
        <div className="menu">
          <div class="bar">
            <div class="bar1"></div>
            <div class="bar2"></div>
          </div>
          <a href="#">Home</a>
          <a href="#">Product</a>
          <a href="#">About</a>
          <a href="#">Help</a>
        </div>
      </nav>

      <div class="dot-design">
        <div class="circle">
          <div ></div>
          <div id="Badmash" ></div>
          <div ></div>
        </div>
        <div className="design">Design.</div>
      </div>
      <div class="year">2<br></br>0<br></br>1<br></br>8</div>
      <div className="content">
        <div className="left-box">
          <h2>Lorem Ipsum <br></br>Sit Amet</h2><hr></hr>
          <p id="First-cont">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh.</p>
        </div>
        <div className="right-box">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
          <button className="sign-in" >SIGN IN</button>
        </div>
      </div>
    </div>
  );
}

export default App;