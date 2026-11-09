import { useState, useEffect } from "react";
import Error from "../components/error/Error";

const SafeImage = ({ src, alt, fallback, ...props}) => {
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setHasError(false);
    }, [src]);

    if (!src || hasError) {
    
        if (fallback) {
            return fallback;
        }
        return <Error {...props} />;
    }

    return (
        <img
            src={src}
            alt={alt}
            onError={() => setHasError(true)}
            {...props}
        />
    );
};

export default SafeImage;