
import Collapsible from "react-collapsible";
import { BsDashCircleFill } from "react-icons/bs";
import { PiPlusCircleDuotone } from "react-icons/pi";

const ArcordionItem = ({ title, content, isOpen, setMenus, index }) => {

    const handleOpening = () => {
        setMenus((prevMenus) => {
            const newMenus = [...prevMenus];
            newMenus[index] = true;
            return newMenus;
        });
    };

    const handleClosing = () => {
        setMenus((prevMenus) => {
            const newMenus = [...prevMenus];
            newMenus[index] = false;
            return newMenus;
        });
    };

    return (
        <div className="dropdown-menu">
            <Collapsible
                onOpening={handleOpening}
                onClosing={handleClosing}
                trigger={
                    <>
                        <div className="dropdown-switch">
                            <div className="dropdown-title">{title}</div>
                            <div className="dropdown-icon" style={{ display: isOpen ? 'none' : 'block' }}>
                                <PiPlusCircleDuotone />
                            </div>
                            <div className="plus-icon" style={{ display: !isOpen ? 'none' : 'block', color: 'inherit' }}>
                                <BsDashCircleFill />
                            </div>
                        </div>
                    </>
                }
            >
                <div className="dropdown-content">
                    <div className="dropdown-texts">{content}</div>
                </div>
            </Collapsible>
        </div>
    );
};

export default ArcordionItem
