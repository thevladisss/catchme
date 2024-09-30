import "./Point.css"
export default function Point(props: any) {

  return (<div className="point" style={{position: "absolute", left: props.left + 'px', top: props.top + 'px'  }}>

  </div>);
}
