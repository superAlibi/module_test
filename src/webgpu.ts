
export function render(canvas: OffscreenCanvas | HTMLCanvasElement, device: GPUDevice) {

  const webgpuCTX = canvas.getContext('webgpu')

  if (!device || !webgpuCTX) {
    return
  };

  const format = navigator.gpu.getPreferredCanvasFormat()
  webgpuCTX.configure({
    device,
    format
  })
  const vertexArr = new Float32Array([
    0.0, 0.5, 0.0,
    -0.5, -0.5, 0.0,
    0.5, -0.5, 0.0,

    0.5, -0.5, 0.0,
    -0.5, -0.5, 0.0,
    0.0, -1.5, 0.0,
  ])
  const vertexBuffer = device.createBuffer({
    size: vertexArr.byteLength,
    // 设置改缓冲区用途
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  })
  device?.queue.writeBuffer(vertexBuffer, 0, vertexArr)
  // 渲染管线也有可能会有很多
  const pipeline = device.createRenderPipeline({
    vertex: {
      buffers: [
        {
          arrayStride: 4 * 3,
          attributes: [
            {
              shaderLocation: 0,
              offset: 0,
              format: 'float32x3'
            }
          ]
        }
      ],
      module: device.createShaderModule({
        code:/* wgsl */`
            @vertex
            fn main(@location(0) pos: vec3<f32>) -> @builtin(position) vec4<f32> {
              var pos2: vec4<f32> = vec4(pos, 1.0);
              pos2.y+=0.5;
              return pos2;
              // return vec4(pos, 1.0);
            }
           
          
          `,

      }),
      entryPoint: 'main'
    },
    primitive: {
      topology: 'triangle-list'
    },
    fragment: {
      module: device.createShaderModule({
        code:/* wgsl */`
            @fragment
            fn main() -> @location(0) vec4<f32> {
              return vec4<f32>(1.0, 0.0, 0.0, 1.0);
            }
          
          `,

      }),
      targets: [{
        format
      }]
    },
    layout: 'auto'
  })
  const commandEncoder = device.createCommandEncoder()
  // 可能存在很多个
  const renderPass = commandEncoder.beginRenderPass({
    colorAttachments: [{
      view: webgpuCTX.getCurrentTexture().createView(),
      clearValue: { r: 0.5, g: 0.5, b: 0.5, a: 1.0 },
      storeOp: 'store',
      loadOp: 'clear'
    }]
  })
  renderPass.setPipeline(pipeline)
  renderPass.setVertexBuffer(0, vertexBuffer)
  renderPass.draw(6)
  renderPass.end()
  device.queue.submit([commandEncoder.finish()])

}