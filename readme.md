# node打包配置和package.json配置样例

1. 配置package.json
   - main: node旧版本(不具体哪个版本,不过不重要)存在的字段,该字段在其实就是node的npm规定的入口文件,彼时nodejs的npm包管理是使用的commonjs规范,现在node已经不推荐使用,推荐使用module字段
   - module: node新版本引入存在的字段,该字段是es6模块化规范,node新版本已经默认支持,所以可以直接使用,但是前提是module值指向的文件必须是esmodule规范,否则会报错
   - exports: 用于规定本库的导入映射,export配置是一个对象,其必须以'.'开头的路径,'.'表示当前包的名称,那么./src:./src/mod.ts这个配置键,在使用者角度看来,在使用本库时的导入路径:module_test/src,表示引用的实际代码是源文件src/mod.ts文件,而不是被编译后的,在dist文件下的脚本文件module_test*.js(后文会解释为什么这里是module_test*.js)