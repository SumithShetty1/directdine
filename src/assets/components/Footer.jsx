import { Link } from 'react-router-dom';
import '../styles/Footer.css'
import facebook from "../images/facebook.png"
import linkedin from "../images/linkedin.png"
import instagram from "../images/instagram.png"

export default function Footer(){
    return(
        <footer>
            <hr/>
            <div className='fcontainer'>
                <p>© 2023 DirectDine. All rights reserved.</p>
                <span className='social'>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <img src={facebook} alt='Facebook' width={30} height={30} />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <img src={instagram} alt='Instagram' width={30} height={30} />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                        <img src={linkedin} alt='Linkedin' width={30} height={30} />
                    </a>
                </span>
            </div>
        </footer>
    );
}