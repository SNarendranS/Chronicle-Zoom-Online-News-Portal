import { useEffect } from 'react'
import './css/legalInfo.css'
function PrivacyPolicy() {
    useEffect(
        ()=>{
            window.scrollTo(0,0)
        },[]
    )
    return (
        <div className="content-container">
            <h1>ChronicleZoom's privacy policy</h1>         
                    <h3>
                        Welcome to ChronicleZoom's Privacy Policy. At ChronicleZoom, we understand the importance of your privacy. This Privacy Policy outlines the types of personal information we collect, how we use this information, and the measures we take to safeguard it.
                    </h3>
                    <ol>
                        <li>
                            Information We Collect:
                        </li>
                        <p>
                            We may collect various types of information, including but not limited to:
                            <ul>
                               <li>
                                    Personal Information: Name, email address, and any voluntarily provided details.
                               </li> 
                               <li>
                                    Usage Data: Information about your interactions with ChronicleZoom, such as pages visited and time spent.
                               </li> 
                            </ul>
                        </p>
                        <li>
                            How We Use Your Information:
                        </li>
                        <p>
                            We use the collected information for purposes such as:
                            <ul>
                                <li>
                                    Providing and improving our services.
                                </li> 
                                <li>    
                                    Customizing content based on user preferences.
                                </li> 
                                <li>
                                    Sending newsletters and updates if you opt-in.
                                </li> 
                            </ul>    
                        </p>
                        <li>
                            Data Security:                
                        </li>
                        <p>
                            We prioritize the security of your information and implement measures to prevent unauthorized access, disclosure, or alteration.
                        </p>
                        <li>
                            Third-Party Links:                
                        </li>
                        <p>
                            ChronicleZoom may contain links to third-party sites. Please note that we are not responsible for the privacy practices of such sites. We encourage you to review their privacy policies.
                        </p>
                        <li>
                            Changes to the Privacy Policy:                
                        </li>
                        <p>
                            We reserve the right to update our Privacy Policy as our services evolve. Any changes will be communicated on this page.
                        </p>
                    </ol>
                    <p>
                        For further details or inquiries regarding our Terms of Service and Privacy Policy, please contact us.
                    </p>
        </div>
    )
}    
export default PrivacyPolicy
