const article = window.document.__article;
const comments = window.document.__comments;
const more_comments = window.document.__moreComments;

// sorting taken from https://stackoverflow.com/questions/42539901/react-sorting-by-date
const sorted_comments = [...comments, ...more_comments]
  .sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  })
  .reverse();
// sorting END

const Header = () => {
  return (
    <nav className="navbar navbar-light __bg-primary mb-4 py-4">
      <div className="container">
        <a className="navbar-brand __text-light" href="#">
          Whys-Blog
        </a>
        <ul className="navbar-nav flex-row __options">
          <li className="nav-item mr-4">
            <a
              className="nav-link d-flex align-items-center __text-light"
              href="#"
            >
              <img src="./assets/home.svg" width="24px" alt="home button" />
            </a>
          </li>
          <li className="nav-item mr-4">
            <a
              className="nav-link d-flex align-items-center __text-light"
              href="#"
            >
              <img
                src="./assets/article.svg"
                width="24px"
                alt="articles button"
                className="__active"
              />
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link d-flex align-items-center __text-light"
              href="#"
            >
              <img
                src="./assets/contact.svg"
                width="24px"
                alt="contact button"
              />
            </a>
          </li>
          {/* <i className="fa fa-moon"></i> */}
        </ul>
      </div>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="small mt-auto __bg-primary __text-light">
      <div className="text-center __text-muted py-2">
        © 2020 Copyright; <strong>Whys-Blog</strong>
      </div>
    </footer>
  );
};

class Application extends React.Component {
  constructor(props) {
    super(props);
    const height = document.getElementById("moreCommentsContainer")
      ? document.getElementById("moreCommentsContainer").clientHeight
      : 0;
    this.state = {
      isLoadMoreShown: true,
      showComments: false,
      showArticle: false,
      fadeDivOut: true,
      height,
      comments: sorted_comments
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ showArticle: true });
    }, 2000);
    setTimeout(() => {
      this.setState({ showComments: true });
    }, 5000);
  }

  changeFade() {
    this.setState({
      fadeDivOut: !this.state.fadeDivOut,
      height: document.getElementById("moreCommentsContainer")
        ? document.getElementById("moreCommentsContainer").clientHeight
        : 0
    });
    setTimeout(() => {
      this.setState({
        isLoadMoreShown: !this.state.isLoadMoreShown
      });
    }, 500);
  }

  handleSubmit = comment => {
    this.setState({ comments: [comment, ...this.state.comments] });
  };

  render() {
    return (
      <div className="h-100 d-flex flex-column">
        <Header />

        <div className="container">
          {/* show article */}
          {this.state.showArticle && (
            <Article
              author={article.author}
              text={article.text}
              date={article.date}
            />
          )}
          {!this.state.showArticle && (
            <div className="__first-spinner spinner-grow d-block mx-auto __text-highlight"></div>
          )}

          {this.state.showComments && (
            <div
              id="allComments"
              className="w-75 mx-auto d-flex flex-column align-items-center"
            >
              <h2 className="animated fadeInUp text-center my-4 __dash __text-primary">
                Comments
              </h2>
              {/* display first 2 comments */}
              {this.state.comments.slice(0, 2).map((comment, index) => (
                <Comment
                  index={index}
                  author={comment.author}
                  text={comment.text}
                  date={comment.date}
                />
              ))}

              {/* button for load more was clicked therefore display rest of comments */}
              <div
                id="moreCommentsContainer"
                className={`w-100 flex-column align-items-center animated __transition 
                ${this.state.fadeDivOut ? "fadeOut" : ""} 
                ${this.state.isLoadMoreShown ? "d-none" : "d-flex"}`}
                style={{
                  visibility: this.state.fadeDivOut ? "hidden" : "",
                  marginTop: this.state.fadeDivOut
                    ? "-" + (this.state.height - 45) + "px"
                    : ""
                }}
              >
                {!this.state.isLoadMoreShown && (
                  <MoreComments moreComments={this.state.comments.slice(2)} />
                )}
              </div>

              {/* Element that is hidden, so when spinner appears screen doesn't "jump" */}
              {this.state.isLoadMoreShown && (
                <div
                  width="2rem"
                  height="2rem"
                  className="d-block my-2"
                  style={{ visibility: "hidden" }}
                >
                  &nbsp;
                </div>
              )}

              {/* first show just button */}
              <button
                className={`btn __btn-primary mb-4`}
                onClick={() => this.changeFade()}
              >
                {/* depending on variable, change content of button */}
                {this.state.fadeDivOut ? "More " : "Hide "}

                <i
                  className={`__transition fa fa-angle-down ${
                    !this.state.fadeDivOut ? "__rotate180" : null
                  }`}
                ></i>
              </button>
            </div>
          )}
          {this.state.showComments && <Form handleSubmit={this.handleSubmit} />}
          {!this.state.showComments && this.state.showArticle && (
            <div className="spinner-grow d-block my-4 mx-auto __text-highlight"></div>
          )}
        </div>

        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<Application />, document.querySelector("#APP"));
