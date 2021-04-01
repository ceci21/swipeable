import React, { useEffect } from 'react';
import $ from 'jquery';
import 'jquery-ui/themes/base/core.css';
import 'jquery-ui/themes/base/theme.css';
import 'jquery-ui/themes/base/draggable.css';
import 'jquery-ui/ui/core';
import 'jquery-ui/ui/widgets/draggable';
import './Swipeable.scss';

// color
// width of targets and selector
// border radius

// const example = [
//   {
//     content, // insertable content
//     onTargetLand // function
//   }
// ]

const example = [
  {
    content: 'A',
    stop: function() { console.log(this.content) }
  },
  {
    content: 'B',
    stop: function() { console.log(this.content) }
  },
  {
    content: 'C',
    stop: function() { console.log(this.content) }
  },
  {
    content: 'D',
    stop: function() { console.log(this.content) }
  },
]

const Swipeable = ({ width = 500, elements = example }) => {
  const approxTargetWidth = Math.floor(width / elements.length + 1);
  const approxElLocations = [];


  useEffect(() => {
    $('.swiper').draggable({
      axis: 'x',
      containment: 'parent',
      scroll: false,
      snap: '.target',
      snapTolerance: 45,
      stop: function(_, stats) {

        console.log(stats)
        const i = Math.floor(stats.position.left / approxTargetWidth);
        console.log(elements[i].stop.bind(elements[i])())
      }

    });
  }, []);

  return (
    <div className="swipeable">
      <div className="swiper draggable ui-widget-content">X</div>
      {
        elements.map(({ content, stop }) => {
          return (
            <div className="target" onClick={stop}>{ content }</div>
          )
        })
      }
    </div>
  );
};

export default Swipeable;
