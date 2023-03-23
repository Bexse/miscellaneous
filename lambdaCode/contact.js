import React, { Component } from "react";
import Reveal from "react-reveal/Reveal/";
import SectionTitleTwo from "../component/Banner/SectionTitleTwo";
import axios from "axios";

class Contact extends Component {
  state = {
    data: {
      email: "",
      name: "",
      phone: "",
      subject: "",
      message: "",
    },
    loading: false,
    errorMsg: "",
    success: false,
    submitted: false,
  };

  onChange = (e) => {
    return this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });
  };

  onSubmit = () => {
    const errorMsg = this.validate(this.state.data);
    if (errorMsg === "") {
      this.setState({ loading: true });
      axios
        .post(
          "https://07cav3y2u3.execute-api.us-east-1.amazonaws.com/notifications-api/unubold/contact",
          this.state.data
        )
        .then(
          (response) => {
            this.setState({ success: true });
          },
          (error) => {
            this.setState({ errorMsg: "Error while sending message!" });
          }
        );
      this.setState({ submitted: true });
      this.setState({ loading: false });
    }
  };

  validate = (data) => {
    let errMsg = "";

    if (!data.email) {
      errMsg += "Email, ";
    }
    if (!data.name) {
      errMsg += "Name, ";
    }
    if (!data.subject) {
      errMsg += "Subject, ";
    }
    if (!data.message) {
      errMsg += "Message, ";
    }

    if (errMsg !== "") errMsg += "cannot be empty!";

    this.setState({ errorMsg: errMsg });

    return errMsg;
  };

  render() {
    return (
      <section className="contact-area contact-area-two bg_color" id="contacts">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-md-12">
              <div className="get_info">
                <SectionTitleTwo btitle="Get in Touch" />
                <div className="media get_item">
                  <i className="flaticon-phone"></i>
                  <div className="media-body">
                    <h6>Phone number</h6>
                    <a href=".#">319-614-0186</a>
                  </div>
                </div>
                <div className="media get_item">
                  <i className="flaticon-chat"></i>
                  <div className="media-body">
                    <h6>Email</h6>
                    <a href=".#">unuboldtumenbayar@gmail.com</a>
                  </div>
                </div>
                <div className="media get_item">
                  <i className="flaticon-pin"></i>
                  <div className="media-body">
                    <h6>Location</h6>
                    <p>Bellevue, WA, 98004, USA</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7 col-md-12">
              <Reveal effect="fadeInRight" duration={800}>
                <div className="input_form">
                  <SectionTitleTwo btitle="Contact me" />
                  <form id="contactForm">
                    <div className="row">
                      <div className="col-lg-6">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          placeholder="Your Name*"
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="col-lg-6">
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          placeholder="Your Email*"
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="col-lg-6">
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          className="form-control"
                          placeholder="Subject*"
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="col-lg-6">
                        <input
                          type="text"
                          className="form-control"
                          id="phone"
                          name="phone"
                          placeholder="Phone"
                          onChange={this.onChange}
                        />
                      </div>
                    </div>
                    <textarea
                      name="message"
                      id="message"
                      className="form-control"
                      rows="6"
                      placeholder="Your Message* ..."
                      onChange={this.onChange}
                    ></textarea>
                    {!this.state.submitted && (
                      <button
                        type="button"
                        onClick={this.onSubmit}
                        disabled={this.state.loading}
                        className="btn send_btn theme_btn"
                      >
                        Send A Secure Message
                      </button>
                    )}
                  </form>
                  {this.state.loading && (
                    <div>
                      <img
                        src={require("../image/loading.gif")}
                        alt="loading"
                      />
                    </div>
                  )}
                  {this.state.success && (
                    <div id="successMsg">
                      I received your message! I will respond shortly in a day
                      via email.
                    </div>
                  )}
                  {this.state.errorMsg !== "" && (
                    <div id="errorMsg">{this.state.errorMsg}</div>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Contact;
