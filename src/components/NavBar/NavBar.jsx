import React, { Component } from 'react';
import Logo from '../../Logo.jpg';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }
  toggleMenu() {
    this.setState({ menu: !this.state.menu });
  }
  render() {
    const show = this.state.menu ? 'show' : '';
    return (
      <header style={{ position: "sticky", top: "0", zIndex: "100"}}>
        <div className='container-fluid' style={padding}>
          <nav
            className='navbar navbar-dark navbar-expand-lg'
            style={{ backgroundColor: '#0984e3' }}
          >
            <a className='navbar-brand' href='/'>
              <img style={{ paddingRight: 5 }} src={Logo} alt='' />
              Turtleman's VetClinic
            </a>
            <button
              className='navbar-toggler'
              type='button'
              onClick={this.toggleMenu}
            >
              <span className='navbar-toggler-icon'></span>
            </button>
            <div className={'collapse navbar-collapse ' + show}>
              <ul className='navbar-nav'>
                <li className='nav-item'>
                  <a className='nav-link' href='/'>
                    Home
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='/owners-dashboard'>
                    Owners Dashboard
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='/patients-dashboard'>
                    Active Patients Dashboard
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    );
  }
}

const padding = {
  paddingLeft: 0,
  paddingRight: 0,
};

export default Navbar;
