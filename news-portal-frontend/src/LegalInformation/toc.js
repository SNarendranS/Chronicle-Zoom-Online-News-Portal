import { useEffect } from 'react'
import './css/legalInfo.css'
function TOC() {
    useEffect(
        ()=>{
            window.scrollTo(0,0)
        },[]
    )
    return (
        <div className="content-container">
            <h1>ChronicleZoom's Terms of Service</h1>
                <h4>
                    Welcome to ChronicleZoom's Terms of Service. By accessing and using ChronicleZoom, you agree to comply with and be bound by the following terms and conditions
                </h4>
                <ol>
                    <li>
                        Acceptance of Terms:
                    </li>
                    <p>
                        You acknowledge that you have read and understood these Terms of Service and agree to be bound by them. If you do not agree, please refrain from using ChronicleZoom.
                    </p>
                    <li>
                        Use of Content:
                    </li>
                    <p>
                        All content on ChronicleZoom is for informational purposes only. You may not reproduce, distribute, or otherwise use any content without explicit permission.
                    </p>
                    <li>    
                        User Conduct:               
                    </li>
                    <p>
                        You agree not to engage in any conduct that may disrupt the functionality of the website or violate applicable laws. ChronicleZoom fosters a dynamic and inclusive community; therefore, we expect users to engage in respectful and constructive interactions.
                    </p>
                    <li>
                        Termination:
                    </li>
                    <p>
                        We reserve the right to terminate or suspend your access to ChronicleZoom at our discretion, without prior notice, if we believe you have violated these terms or for any other reason.
                    </p>
                    <li>
                        Limitation of Liability:
                    </li>
                    <p>
                        ChronicleZoom is not liable for any direct, indirect, incidental, consequential, or exemplary damages resulting from your use of our platform. Users engage with ChronicleZoom at their own risk.
                    </p>
                </ol>
        </div>)
}
export default TOC
       