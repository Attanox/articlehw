class Comment extends React.Component {
  render() {
    const { index, author, text, date } = this.props;
    return (
      <div
        className={`__comment-row w-100 d-flex justify-content-between align-items-center animated mb-5 ${
          index % 2 !== 0
            ? "__even fadeInLeft flex-row-reverse"
            : "__odd fadeInRight"
        }`}
      >
        <div
          className={`__comment w-75 d-flex align-items-center shadow-lg ${
            index % 2 !== 0
              ? "__even border __border-primary __thicker-border __bg-light __text-primary ml-5"
              : "__odd __bg-primary __text-light mr-5"
          }`}
        >
          <p className="text-justify">{text}</p>
        </div>
        <Avatar index={index} author={author} date={date} />
      </div>
    );
  }
}

const Avatar = ({ index, author, date }) => {
  return (
    <div
      className={`__avatar w-25 d-flex justify-content-center align-items-center ${
        index % 2 !== 0
          ? "flex-row-reverse animated fadeInLeft"
          : "animated fadeInRight"
      }`}
    >
      {index % 2 !== 0 ? (
        <i className="fa fa-user-circle __user-img __text-primary"></i>
      ) : (
        <i className="fa fa-user-circle-o __user-img __text-primary"></i>
      )}
      <div
        className={`__user-info __text-primary ${
          index % 2 !== 0 ? "mr-3" : "ml-3"
        }`}
      >
        <h6>{author}</h6>
        <span className="__text-muted small">
          {new Date(date).toLocaleString().slice(0, -3)}
        </span>
      </div>
    </div>
  );
};

const MoreComments = ({ moreComments }) => {
  const [isSpinnerShown, setIsSpinnerShown] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => setIsSpinnerShown(false), 3000);
  }, []);

  return (
    <React.Fragment>
      {!isSpinnerShown &&
        moreComments.map((moreComment, index) => (
          <Comment
            index={index}
            author={moreComment.author}
            text={moreComment.text}
            date={moreComment.date}
          />
        ))}
      {isSpinnerShown && (
        <div className="spinner-grow my-2 __text-highlight"></div>
      )}
    </React.Fragment>
  );
};
