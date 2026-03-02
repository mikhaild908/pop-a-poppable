import { useRef, useEffect } from 'react';
import './Poppable.css'

type Props = {
    image: string;
    canvasWidth: number;
    canvasHeight: number;
    onPop: () => void;
    shouldUpdatePosition: boolean;
}

let originalHeight = 0;

export function Poppable({image, canvasWidth, canvasHeight, onPop, shouldUpdatePosition} : Props) {
    const poppableRef = useRef<HTMLImageElement>(null);
    const poppable = poppableRef.current;
    
    if(originalHeight === 0)
    {
        originalHeight = poppable?.getBoundingClientRect().height || 0;
    }
    
    const movePoppable = () => {
        if (poppable) {
            poppable.style.height = `${originalHeight}px`;

            const { width, height } = poppable.getBoundingClientRect();
            const left = Math.random() * (canvasWidth - width);
            const top = Math.random() * (canvasHeight - height);
            
            poppable.style.left = `${left}px`;
            poppable.style.top = `${top}px`;
        }
    };

    useEffect(() => {
        if(shouldUpdatePosition){
            //console.log('moving poppable...');
            movePoppable();
        }
        
    }, [shouldUpdatePosition]);

    useEffect(() => {
        const poppable = poppableRef.current;

        const handleClick = () => {
            if (poppable) {
                //console.log('popped!');
                poppable.style.height = '1px';
                onPop();
            }
        };

        if (poppable) {
            //console.log('added onClick listener');
            poppable.addEventListener('click', handleClick);
        }

        // Cleanup to prevent memory leaks
        return () => {
            if (poppable) {
                //console.log('removed onClick listener');
                poppable.removeEventListener('click', handleClick);
            }
        };
    }, []);

    return (
        <img id='poppable' src={image} alt='poppable' ref={poppableRef} />
    );
}