import './countDown.css';
const countDownStart = ({ctrDwn}) => {
    return (
        <div className="box">
            <div className="head">
                <div className="head1">Game starts in ...</div>
                <div className="ctr1">{Math.floor(ctrDwn/2000)===0?"GO!":Math.floor(ctrDwn/2000)}</div>
            </div>
        </div>
    );
}
export default countDownStart;