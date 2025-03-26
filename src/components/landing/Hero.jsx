import { Link } from 'react-router-dom';

function Hero({ content }) {
    return (
        <div className="hero min-h-[50vh] bg-base-200">
            <div className="hero-content text-center">
                <div className="">
                    <h1 className="text-5xl leading-relaxed font-bold">{content.title}</h1>
                    <p className="py-6">{content.description}</p>
                    {content.buttonText && content.buttonLink && (
                        <Link to={content.buttonLink} className="btn btn-primary">
                            {content.buttonText}
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Hero;
