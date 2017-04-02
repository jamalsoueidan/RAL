import React from 'react'
import { findDOMNode } from 'react-dom'

export default class Content extends React.Component {
  constructor(props) {
    super(props)
    this.data = props.data;
    this.onMouseWheelHandler = this.onMouseWheelHandler.bind(this)
  }

  /* This method is called when select props is set */
  scrollToSelected() {
    const { selected, onScrollPosition, rowHeight } = this.props
    if(!selected) return;
    const keys = Object.keys(selected);
    const index = this.data.findIndex((item) => keys.every(key => selected[key] === item[key]))
    onScrollPosition(index * rowHeight)
  }

  onMouseWheelHandler(evt) {
    evt.preventDefault();
    const onMouseWheel = this.props.onMouseWheel;
	  const wheelDelta = Math.max(-1, Math.min(1, (evt.wheelDelta || -evt.detail)));
    onMouseWheel(wheelDelta)
  }

  get body() {
    const { scrollPosition, rowHeight, data, rowRenderer, perPage } = this.props;
    let from = Math.floor(scrollPosition/rowHeight);
    let to = perPage+from;
    if(to>data.length) {
      from = data.length - perPage;
      to = data.lenght;
    }
    return data.slice(from, to).map(rowRenderer)
  }

  render() {
    return(
      <div className="content">
        <table>
          <tbody>
            {this.body}
          </tbody>
        </table>
      </div>
    )
  }

  componentDidMount() {
    this.scrollToSelected()
    const node = findDOMNode(this);
    node.addEventListener("mousewheel", this.onMouseWheelHandler);
  }
}
