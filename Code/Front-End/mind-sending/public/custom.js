unlayer.registerPropertyEditor({
    name: 'personal',
    layout: 'bottom',
    Widget: unlayer.createWidget({
      render(value) {
        return `
          <p class="color-value" value=${value} />
          <button class="email">Email</button>
          <button class="last_name">LastName</button>
          <button class="first_name">FirstName</button>
        `
      },
      mount(node, value, updateValue) {
        var input = node.getElementsByClassName('color-value')[0]
        input.onchange = function(event) {
          updateValue(event.target.value)
        }
  
        var redButton = node.getElementsByClassName('email')[0]
        redButton.onclick = function() {
          updateValue(`email_subcriber`)
        }
  
        var greenButton = node.getElementsByClassName('last_name')[0]
        greenButton.onclick = function() {
          updateValue(`last_name_subcriber`)
        }
  
        var blueButton = node.getElementsByClassName('first_name')[0]
        blueButton.onclick = function() {
          updateValue(`first_name_subcriber`)
        }
      }
    })
  });
  
  unlayer.registerTool(
    {
    type: 'whatever',
    category: 'contents',
    label: 'name',
    icon: 'fa-user',
    values: {
    },
    options: {
      default: {
        title: null,
      },
      text: {
        title: "personalization",
        position: 1,
        options: {
          "text": {
            "label": "text",
            "defaultValue": "<p style=\"font-size: 14px; line-height: 140%;\"><span style=\"font-family: Verdana, sans-serif; font-size: 16px; color: #000000; font-weight: 400; line-height: 22.4px;\">email_subcriber</span></p>",
            "widget": "personal",
            "draggable":"true",
            "color":"#000",
            "textAlign":"left",
            "lineHeight":"140%",
            "deletable":"true"
          }
        },
      }
    },
    renderer: {
      Viewer: unlayer.createViewer({
        render(values) {
          console.log(values.text)
          return `
          <p style=\"font-size: 14px; line-height: 140%;\"><span style=\"font-family: Verdana, sans-serif; font-size: 16px; color: #000000; font-weight: 400; line-height: 22.4px;\">${values.text}</span></p>
          `
        }
      }),
      exporters: {
        web: function(values) {
          return `<p style=\"font-size: 14px; line-height: 140%;\"><span style=\"font-family: Verdana, sans-serif; font-size: 16px; color: #000000; font-weight: 400; line-height: 22.4px;\">${values.text}</span></p>`
        },
        email: function(values) {
          return `<p style=\"font-size: 14px; line-height: 140%;\"><span style=\"font-family: Verdana, sans-serif; font-size: 16px; color: #000000; font-weight: 400; line-height: 22.4px;\">${values.text}</span></p>`
        }
      },
    },
  }
  );

  