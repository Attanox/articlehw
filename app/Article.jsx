class Article extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className={
          "animated slideInLeft __article shadow-lg __bg-primary my-4 __text-light"
        }
      >
        <h1 className="mb-4 d-inline-block __dash-white">
          {this.props.author}
        </h1>
        <h6 className="mb-5 __text-muted small">
          {" "}
          <span className="text-capitalize">posted:</span>
          &nbsp;&nbsp;
          <span className="">
            {new Date(this.props.date).toLocaleString().slice(0, -3)}
          </span>
        </h6>
        <p className="w-75 text-justify __long-paragraph">{this.props.text}</p>
      </div>
    );
  }
}
