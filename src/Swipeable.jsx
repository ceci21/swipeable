import React, { useEffect } from 'react';
import $ from 'jquery';
import 'jquery-ui/themes/base/core.css';
import 'jquery-ui/themes/base/theme.css';
import 'jquery-ui/themes/base/draggable.css';
import 'jquery-ui/ui/core';
import 'jquery-ui/ui/widgets/draggable';
import './Swipeable.scss';

// TODO: Typescript compatibility
// TODO: Classnames shouldn't conflict
// you can stuff whatever info, as long as you have 'onDragEnd' to specify
//  a cb to run after dragging end
// remove jquery reliance

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
    onDragEnd: function () {
      console.log(this.content);
    },
  },
  {
    content: 'B',
    onDragEnd: function () {
      console.log(this.content);
    },
  },
  {
    content: 'C',
    onDragEnd: function () {
      console.log(this.content);
    },
  },
  {
    content: 'D',
    onDragEnd: function () {
      console.log(this.content);
    },
  },
];

const Swipeable = ({ width = 500, elements = example }) => {
  const approxTargetWidth = Math.floor(width / elements.length + 1);

  useEffect(() => {
    $('.swiper').draggable({
      axis: 'x',
      containment: 'parent',
      scroll: true,
      snap: '.target',
      snapTolerance: 50,
      stop: function (_, stats) {
        console.log(stats);
        const i = Math.floor(stats.position.left / approxTargetWidth);
        if (i > 0) {
          elements[i].onDragEnd()
        }
        $('.swiper').addClass('fall');
        $('.swipeable').addClass('wiggle');
        setTimeout(() => {
          $('.swiper').css('left', 0);
          setTimeout(() => {
            $('.swiper').removeClass('fall');
            $('.swipeable').removeClass('wiggle');
          }, 1000)
        }, 100);
      },
    });
  }, []);

  return (
    <div className="swipeable">
      <div className="swiper draggable ui-widget-content">X</div>
      {/* <div className="home target">
        h
      </div> */}
      {elements.map(({ content, stop }) => {
        if (content) {
          return (
            <div className="target" onClick={stop}>
              {content}
            </div>
          );
        } else {
          return null;
        };
      })}
    </div>
  );
};

export default Swipeable;
