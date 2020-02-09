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
    const d = new Date();
    this.props.handleSubmit({ ...this.state, date: d });
    this.setState(this.initialState);
    event.preventDefault();
  };

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        class="__form mb-4 __bg-primary"
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
          ></textarea>
        </div>
        <input
          className="btn __btn-primary mb-4"
          type="submit"
          value="Submit"
          onClick={this.handleSubmit}
        />
      </form>
    );
  }
}
