import React from 'react'
import '../../styles/Footer.css'
function Footer() {
  return (
    <div class="site-footer-newsletter">
        <h5 class="site-footer-heading">Newsletter</h5>
        <form>

        
          <div id="newsletter">
            <input name="input_newsletter" id="input_newsletter" type="email" value=""  placeholder="Enter your email address" aria-required="true" aria-invalid="false"></input>
          </div>
          <div>
            <input type="submit" id="newsletter_submit_button" class="newsletter_button" value="Subscribe"></input>
          </div>
        </form>
    </div>
  )
}

export default Footer