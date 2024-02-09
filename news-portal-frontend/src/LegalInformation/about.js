import { useEffect } from 'react'
import './css/legalInfo.css'
function About() {
    useEffect(
        ()=>{
            window.scrollTo(0,0)
        },[]
    )
    return (
        <>
                <div className="content-container">
            <h1>About ChronicleZoom</h1>
            <p>
                "Welcome to ChronicleZoom – a premier destination for immersive and dynamic news coverage. 
                At ChronicleZoom, we take pride in our commitment to providing you with timely, comprehensive, and in-depth stories. 
                In the ever-evolving landscape of information, our goal is to keep you well-informed, 
                a rich tapestry of news that captures the essence of a fast-paced world. Step into a vibrant space where events unfold, 
                and stories come to life, creating a unique and engaging experience for our readers. Whether you're looking for breaking news, 
                insightful analyses, or captivating features, 
                ChronicleZoom is your reliable source for staying connected with the pulse of the world."
            </p>
        </div>

        </>

    )
}    
export default About