class Form extends React.Component {
  constructor(props) {
    super(props);

    this.initialState = {
      author: "",
      text: ""
    };

    this.state = this.initialState;
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const d = new Date();
    if (
      this.state.author === this.initialState.author ||
      this.state.text === this.initialState.text
    )
      return;
    this.props.handleSubmit({ ...this.state, date: d });
    this.setState(this.initialState);
  };

  updateComments() {
    if (
      this.state.author === this.initialState.author ||
      this.state.text === this.initialState.text
    )
      return;
    const allComments = document.querySelectorAll(".__comment-row");
    allComments.forEach((comment, index) => {
      // remove class and immediately add class back
      comment.style.visibility = "hidden";
      if (index % 2 !== 0) {
        comment.classList.remove("fadeInLeft");
        setTimeout(() => {
          comment.style.visibility = "visible";
          comment.classList.add("fadeInLeft");
        }, 200);
      } else {
        comment.classList.remove("fadeInRight");
        setTimeout(() => {
          comment.style.visibility = "visible";
          comment.classList.add("fadeInRight");
        }, 200);
      }
    });
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        class="__form animated slideInRight my-4 __bg-primary"
        width="5rem"
      >
        <div className="form-group">
          <label htmlFor="author" className="text-white">
            Name:
          </label>
          <input
            className="form-control w-75"
            placeholder="Name"
            name="author"
            type="text"
            value={this.state.author}
            onChange={this.handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="text" className="text-white">
            Your Comment:
          </label>
          <textarea
            className="form-control w-75"
            name="text"
            rows="7"
            value={this.state.text}
            onChange={this.handleChange}
            placeholder="Write you comment here..."
            required
          ></textarea>
        </div>
        <button
          className="btn __btn-primary mb-4"
          onClick={() => {
            this.handleSubmit;
            this.updateComments(this.state);
          }}
        >
          Submit
        </button>
      </form>
    );
  }
}
