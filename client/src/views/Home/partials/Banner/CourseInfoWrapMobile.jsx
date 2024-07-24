import { useEffect } from "react";

const CourseInfoWrapMobile = () => {
    useEffect(() => {
        // Get the element to be animated
        const element = document.querySelector('.course-info-wrapper');

        // Function to check if an element is in the viewport
        const isInViewport = (element) => {
            const rect = element.getBoundingClientRect();
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

            return (
                rect.top >= -500 &&
                rect.left >= 0 &&
                rect.bottom <= viewportHeight + 600 &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        };

        // Function to handle scroll event
        const handleScroll = () => {
            if (isInViewport(element)) {
                // Add the 'custom-fade-up' class when the element is in the viewport
                element.classList.add('custom-fade-up');
                element.classList.remove('hideImg');
            } else {
                element.classList.remove('custom-fade-up');
                element.classList.add('hideImg');
            }
        };

        // Attach the handleScroll function to the scroll event
        window.addEventListener('scroll', handleScroll);

        // Invoke handleScroll once to check the initial visibility
        handleScroll();

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Run this effect only once on mount

    return (
        <div className="course-info-wrapper hideImg">
            <div className="course-info-block">
                <div className="numbers-info">20 min 🔥</div>
                <div className="detail-info">Besparing per intake</div>
            </div>
        </div>
    );
};

export default CourseInfoWrapMobile;
