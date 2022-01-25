const Loading = props => {
    const renderLoader = () => {
        if (props.isLoading === true) {
          return (
            <div className="lds-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          );
        }
      };
    
      return <>{renderLoader()}</>;
};
export default Loading;