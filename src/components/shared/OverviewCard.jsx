
import PropTypes from 'prop-types';

const OverviewCard = ({ title, mainContent, subContent }) => (
    <div className="px-4 pt-6 pb-6 lg:w-1/4  m-6 mx-0 border-solid border-2 border-grey-500 rounded-2xl">
        <h3 className="text-sm font-medium p-2 px-0">{title}</h3>
        <p className="font-bold text-xl">{mainContent}</p>
        <p className="text-xs">{subContent}</p>
    </div>
);

OverviewCard.propTypes = {
    title: PropTypes.string,
    mainContent: PropTypes.number,
    subContent: PropTypes.string,
};

export default OverviewCard;