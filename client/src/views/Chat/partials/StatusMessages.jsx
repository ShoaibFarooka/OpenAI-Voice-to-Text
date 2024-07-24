import { useEffect, useState } from 'react'
import { ENUM_STATUS } from '../../../configs/constants'
import { formatTime } from '../../../hooks/helpers'

const StatusMessages = ({ recordState, totalElapsedTime, loading, apiCallSuccess }) => {

    // states
    const [loadingDots, setLoadingDots] = useState(0);

    // loading dots
    useEffect(() => {
        const interval = setInterval(() => {
            // Update loading dots
            setLoadingDots((prevDots) => (prevDots + 1) % 4);

            // Reset loading after 4 seconds
            if (loadingDots === 3) {
                setLoadingDots(0);
            }
        }, 250);

        // Clear interval when the component unmounts
        return () => clearInterval(interval);
    }, [loadingDots]);

    return (
        <div className="mt-3 mb-3 text-center">
            {((recordState !== ENUM_STATUS.NONE && !loading) && (recordState !== ENUM_STATUS.NONE && !apiCallSuccess)) &&
                <>
                    Start Recording {totalElapsedTime > 0 && formatTime(totalElapsedTime)}
                </>
            }

            {(loading) && 'Bezig met verwerken⌛️' + '.'.repeat(loadingDots)}
            {apiCallSuccess && 'Bekijk het resultaat! 🚀'}
        </div>
    )
}

export default StatusMessages