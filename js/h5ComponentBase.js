// H5基本图文组件

var H5ComponentBase = function( setClass, cfg ) {

  if( arguments.length === 1 ) {
    switch (typeof arguments[0]) {
      case 'object':
        cfg = arguments[0];
        setClass = null;
        break;
      case 'string':
        cfg = {};
        break; 
    }
  }

  //设置默认配置文件
  var config = $.extend({
    
  }, cfg);

  //取得一个随机数来作为id取值，这里保留小数点后3位
  var _id = Math.round( ( Math.random()*1000 ) ) / 1000;
  //替换小数点位下划线
  var id = ('h5_base' + _id).replace('.','_'); 

  //设置自定义的class
  var _className = setClass ? setClass : '';
  var component = $('<div class="h5_component h5_component_base '+ _className +'" id="'+ id +'"></div>');
  
  //加入文本
  config.text && component.text( config.text );

  //加入样式
  config.width && component.width( config.width/2 );
  config.height && component.height( config.height/2 );
  config.css && component.css( config.css );
  
  //加入图片背景
  config.backgroundImage && component.css({
    'background-image': 'url('+ config.backgroundImage +')'
  });

  //组件对齐方式
  switch( config.align ) {
    case 'verticalCenter':
      component.css({
        top: '50%',
        left: '50%',
        marginLeft: -component.width()/2 + 'px',
        marginTop: -component.height()/2 + 'px'
      });
      break;
    case 'center':
      component.css({
        left: '50%',
        marginLeft: -component.width()/2 + 'px'
      });
      break;  
  }

  // 自定义事件
  var cls = 'h5_component_base_';
  component.on('onLoad', function(event) {
    
    event.stopPropagation();
    //这里加class是为了更自由的添加组件加载样式
    $(this).addClass(cls + 'load').removeClass(cls+'leave');
    config.animateIn && component.animate(config.animateIn);
  
  });

  component.on('onLeave', function(event) {

    event.stopPropagation();

    $(this).addClass(cls + 'leave').removeClass(cls+'load');
    config.animateOut && component.animate(config.animateOut);
  
  });

  return component;
  
};