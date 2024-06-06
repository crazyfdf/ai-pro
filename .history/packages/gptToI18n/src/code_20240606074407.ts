import { client, env } from 'kiss-core'
import { io_hook as io } from 'kiss-msg'

// client.showUI(__html__)

if (!env.inMg) {
  client.figma.showUI(__html__, {
    width: 200,
    height: 120
  })
} else {
  client.mg.showUI(__html__, {
    width: 200,
    height: 160
  })
}
