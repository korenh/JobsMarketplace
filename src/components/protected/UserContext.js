import React, { Component } from "react";
const UserContext = React.createContext();

class UserProvider extends Component {
  // Context state
  state = {
    user: {
      uid: "",
      name: " ",
      profileImageURL: "",
      description: "",
    },
    lang: false,
  };

  setLang = () => {
    this.setState({ lang: !this.state.lang });
  };

  setUser = (uid, name, profileImageURL, description) => {
    const user = {
      uid,
      name,
      profileImageURL,
      description,
    };
    this.setState({ user });
    alert(user.name);
  };

  render() {
    const { children } = this.props;
    const { user } = this.state;
    const { lang } = this.state;
    const { setUser } = this;
    const { setLang } = this;

    return (
      <UserContext.Provider
        value={{
          user,
          setUser,
          setLang,
          lang,
        }}
      >
        {children}
      </UserContext.Provider>
    );
  }
}

export default UserContext;

export { UserProvider };
