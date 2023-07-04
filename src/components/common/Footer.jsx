import React from 'react'
import '../../styles/Footer.css'
function Footer() {
  return (
    <footer>
      <section className='site-footer-main h-60vh'>
      <div className='site-footer-menu-column'>
        <h5 className="site-footer-heading">Sitemap</h5>
        <nav className="site-footer-menu">
          <ul className="site-footer-menu">
            <li>
            <a href="">About me</a>
            </li>
            <li>
            <a href="">Facebook</a>
            </li>
            <li>
            <a href="">Instagram</a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="site-footer-newsletter">
          <h5 className="site-footer-heading">Newsletter</h5>
          <form>
            <div id="newsletter">
              <input name="input_newsletter" id="input_newsletter" type="email" value=""  placeholder="Enter your email address" aria-required="true" aria-invalid="false"></input>
            </div>
            <div>
              <input type="submit" id="newsletter_submit_button" className="newsletter_button" value="Subscribe"></input>
            </div>
          </form>
      </div>
      </section>
      
    </footer>
  )
}

export default Footer