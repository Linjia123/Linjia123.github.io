一、Gulp构建流程说明：

1、每次开发之前一定要先拉一次七牛代码
2、cd到当前目录后，执行“gulp”命令，gulp编译后，打开浏览器定位到localhost:3000/assets
3、开始编写代码，写完后执行“gulp release”命令，代码会自动打包到assets目录
4、将所有代码（除“node_modules”目录）加入git后提交代码
5、每次提交和更新代码都必须release一次，防止冲突

注：如果删除不了node_modules目录，可安装npm install rimraf -g后cd到指定目录执行rimraf node_modules

二、目录和文件说明
wei-m --
       |--- html （html源码）      
          |-- include （公用html）  
       |
       |--- sass （sass源码） 
       |  |-- mod （组件css）
       |
       |--- js （js源码）  
       |  |-- mod （组件js）
       |
       |--- lib （第三方js类库、插件源码）    
       |
       |--- img （公用图片）   
       |
       |--- assets （代码发布目录）   
       |
       |--- Gulpfile.js （Gulp配置文件）
       |
       |--- package.json （Gulp依赖模块声明）    
       
