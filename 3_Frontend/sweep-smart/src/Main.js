import React from "react";
import "./main.css";
import SchedulePage from './components/SchedulePage';
import OperatorPage from './components/OperatorPage';
import VehiclePage from './components/VehiclePage';

// import DatePicker from './components/DatePicker';
import SSDatePicker from './Calendar';

import StaffPanel from './StaffPanel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class Main extends React.Component {
	constructor(props) {
    super(props);
    let date = new Date();
    let currentTab = "";
    if (this.props.buttons.length > 0) {
    	currentTab = this.props.buttons[0];
    }
    this.state = {currentTab: currentTab,
    			date: date,
    			viewType: this.props.viewType};
    this.handleClick = this.handleClick.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleViewTypeChange = this.handleViewTypeChange.bind(this);
    this.handleClickLeft = this.handleClickLeft.bind(this);
	this.handleClickRight = this.handleClickRight.bind(this);
  }



  handleClick(newTab) {
  	this.setState({currentTab: newTab});
  }

  handleDateChange(date) {
  	this.setState({date: date});
  }

  handleViewTypeChange(event) {
  	this.setState({viewType: event.target.value});
  }

  handleClickLeft(params) {
  	let newDate = new Date(this.state.date);
  	newDate.setDate(newDate.getDate() - 7);
  	this.setState({date: newDate});
  }

  handleClickRight(params) {
  	let newDate = new Date(this.state.date);
  	newDate.setDate(newDate.getDate() + 7);
  	this.setState({date: newDate});
  }

	render() {
		let mainContent;
		if (this.props.pageName === 'Schedule') {
			mainContent = <SchedulePage tab={this.state.currentTab} date={this.state.date}/>;
		}else if(this.props.pageName === 'Operators' ){
			// TODO: return Operator component
			mainContent = <OperatorPage tab={this.state.currentTab} date={this.state.date}/>;
		}else if(this.props.pageName === 'Vehicles'){
			// TODO: return Vehicle component
			mainContent = <VehiclePage
				tab={this.state.currentTab}
				date={this.state.date}
				viewType={this.state.viewType}/>;
		}else if(this.props.pageName === 'Performance'){
			// TODO: return Performance component
			mainContent = <SchedulePage tab={this.state.currentTab} date={this.state.date}/>;
		}
		let buttons;
		if (this.props.pageName === 'Vehicles' && this.state.viewType === 'week') {
			buttons = <div className="button-container"></div>;
		} else {
			buttons = <div className="button-container">
				{this.props.buttons.map((value, index) => 
					{
						if (value === this.state.currentTab) {
							return <CurButton value={value} handleClick={this.handleClick}/>;
						} else {
							return <NotCurButton value={value} handleClick={this.handleClick}/>;
						}
					}
				)}
			</div>
		}
		return (
			<div className="main">
				<WeekAndDayPicker pageName={this.props.pageName}
					date={this.state.date}
					handleDateChange={this.handleDateChange}
					viewType={this.state.viewType}
					handleViewTypeChange={this.handleViewTypeChange}
					handleClickLeft={this.handleClickLeft}
					handleClickRight={this.handleClickRight}/>
				<div className="main-tab">
					{buttons}
					{mainContent}
				</div>
				<div>
					<StaffPanel/> 
				</div>
			</div>
			
		);
	}
}

Main.defaultProps = {
  buttons: []
};

class CurButton extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="cur-button">
			<a href="#" onClick={()=>this.props.handleClick(this.props.value)}>{this.props.value}</a>
			</div>
		);
	}
}

class NotCurButton extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="not-cur-button">
			<a href="#" onClick={()=>this.props.handleClick(this.props.value)}>{this.props.value}</a>
			</div>
		);
	}
}

class WeekAndDayPicker extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const options = [{value: "week", label: "Week"},
										 {value: "day", label: "Day"}];
		let weekAndDayPicker;
		if (this.props.viewType === "week") {
			weekAndDayPicker = <WeekPicker
				date={this.props.date}
				handleClickLeft={this.props.handleClickLeft}
				handleClickRight={this.props.handleClickRight}/>
		} else if (this.props.viewType === "day") {
			weekAndDayPicker = <DayPicker date={this.props.date}/>
		}
		return (
			<div className="week-and-day-picker">
				<div className="page-name">{this.props.pageName}</div>
				<div className="display-dropdown">
					{weekAndDayPicker}
					<Select
					  class="view-type-dropdown"
			          value={this.props.viewType}
			          onChange={this.props.handleViewTypeChange} >
			          <MenuItem value="week">Week</MenuItem>
			          <MenuItem value="day">Day</MenuItem>
			        </Select>
				</div>
				<SSDatePicker date={this.props.date} handleDateChange={this.props.handleDateChange}/>
				
			</div>
		);
	}
}

class WeekPicker extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="week-picker">
				<div className="week-display">{GetWeekRange(this.props.date)}</div>
				<div className="week-picker-arrows">
				<a href="#" onClick={this.props.handleClickLeft}><LeftArrowIcon/></a>
				<a href="#" onClick={this.props.handleClickRight}><RightArrowIcon/></a>	
				</div>
			</div>
		);
	}
}

class DayPicker extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="day-picker">
				<div className="day-display">{GetDayDisplay(this.props.date)}</div>
				<div className="day-picker-arrow">
					<DownArrowIcon/>
				</div>
			</div>
		);
	}
}

function GetWeekRange(date) {
	let week = [];
	let first = date.getDate() - date.getDay();
	let curr = new Date(date);
	curr.setDate(first);
	for (let i = 0; i < 7; i++) {
		let month = curr.getMonth() + 1;
		let day = curr.getDate();
		let year = curr.getYear() + 1900;
	  curr.setDate(curr.getDate() + 1);
	  week.push(month + "/" + day + ", " + year);
	}
	let weekRange = week[0] + " - " + week[6];
	return weekRange;
}

function GetDayDisplay(date) {
	let month = date.getMonth() + 1;
	let day = date.getDate();
	let year = date.getYear() + 1900;
	return month + "/" + day + ", " + year;
}

function LeftArrowIcon() {
	return (
		<svg id="svg-left-arrow" width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M10.8792 19.6287C11.1266 19.3815 11.2502 19.0885 11.2502 18.7498L11.2502 1.25009C11.2502 0.911336 11.1266 0.61848 10.8792 0.371047C10.6315 0.123614 10.3386 0 10.0001 0C9.6616 0 9.36874 0.123614 9.12124 0.371047L0.371333 9.12095C0.1239 9.36866 1.23978e-05 9.66152 1.23978e-05 10C1.23978e-05 10.3385 0.1239 10.6316 0.371333 10.8788L9.12131 19.6287C9.36874 19.8759 9.6616 20 10.0002 20C10.3386 20 10.6315 19.8759 10.8792 19.6287Z" fill="#7A827F"/>
		</svg>
	);
}

function RightArrowIcon() {
	return (
		<svg id="svg-right-arrow" width="13" height="20" viewBox="0 0 13 20" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M1.18355 0.371254C0.936114 0.618481 0.8125 0.911541 0.8125 1.25016L0.8125 18.7499C0.8125 19.0887 0.936114 19.3815 1.18355 19.629C1.43125 19.8764 1.72411 20 2.06266 20C2.40115 20 2.694 19.8764 2.9415 19.629L11.6914 10.879C11.9388 10.6313 12.0627 10.3385 12.0627 10C12.0627 9.66152 11.9388 9.36839 11.6914 9.12116L2.94144 0.371254C2.694 0.124094 2.40115 0 2.06259 0C1.72411 0 1.43125 0.124094 1.18355 0.371254Z" fill="#7A827F"/>
		</svg>
	);
}

function DownArrowIcon() {
	return (
		<svg id="svg-down-arrow" width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M19.6287 0.371047C19.3815 0.123614 19.0885 0 18.7498 0H1.25009C0.911336 0 0.61848 0.123614 0.371047 0.371047C0.123614 0.618753 0 0.911609 0 1.25016C0 1.58865 0.123614 1.8815 0.371047 2.129L9.12095 10.8789C9.36866 11.1263 9.66152 11.2502 10 11.2502C10.3385 11.2502 10.6316 11.1263 10.8788 10.8789L19.6287 2.12894C19.8759 1.8815 20 1.58865 20 1.25009C20 0.91161 19.8759 0.618753 19.6287 0.371047Z" fill="#7A827F"/>
		</svg>
	);
}

export default Main

