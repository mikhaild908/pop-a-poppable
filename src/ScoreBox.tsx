import './ScoreBox.css';

type Props = {
    score: number;
    remainingTime: number;
}

export function ScoreBox({score, remainingTime} : Props) {
    return (
        <div>
            <h1 id='score-box'>
                {`Time : ${remainingTime} | Score: ${score}`}
            </h1>
            <h2 id='game-over' style={{display: remainingTime <= 0 ? 'block' : 'none'}}>
                *** GAME OVER ***
            </h2>
        </div>
    );
}