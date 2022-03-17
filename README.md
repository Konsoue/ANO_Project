# 无人机地面站软件系统

广工信工无人机课设的任务之一，写一个地面站软件。

基于 STM32F401 芯片处理模块 与 NRF24L01 蓝牙模块制作简易无人机。

通信过程：无人机 <—蓝牙—> 遥控器 <—串口—> 服务端 <——> 应用程序

这个软件系统实现的是，服务端与应用程序。

**声明：代码仅用于学习**

## 服务端

基于 serialport 的 node.js 串口通信库，实现串口通信。
由于服务端需要频繁的推送数据给前端，故使用 websocket 进行前后端通信。

实现的功能：
1. 基于 ANO 协议，解析串口数据。
2. 实现 PID 数据解析与封装
3. 使用 websocket 协议，与应用程序通信

开启服务器的方式：
在 server 目录下：`node index`

## 应用程序

基于 react + electron 搭建应用程序界面，使用 antd UI 库，快速搭建简单又好看的界面。

实现的功能：
1. 无人机姿态数据的显示
2. 无人机 3D 姿态的实时显示
3. PID 数据的解析，封装，显示


开启应用程序的方法
在 client 目录下：`npm start && npm run electron`