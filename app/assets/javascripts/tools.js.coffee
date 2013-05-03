# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/


String.prototype.scan = (re) ->
  if (!re.global)
    throw "ducks"

  s = this
  r = []

  while (m = re.exec(s))
    m.shift()
    r.push(m)

  return r

inputPattern = /%input ([\w]+)/g

findInputs = (code) ->
  matches = code.toString().scan(inputPattern)
  inputs = $.map(matches, (element, index) ->
    return element[0]
  )

updateInputs = (args) ->
  previousInputElement = null

  # Check for args that are not yet inputs
  args.forEach((arg, index, arr) ->
    inputElement = $('.tool_execution_form').find("#args_"+arg)[0]

    if (inputElement)
      previousInputElement = inputElement
    else
      newLabel = "<label for='args_"+arg+"'>"+arg+"</label>"
      newInput = "<input type='text' name='args["+arg+"]' id='args_"+arg+"'>"

      if previousInputElement
        $(previousInputElement).after(newInput)
        $(previousInputElement).after(newLabel)

      else
        $('.tool_execution_form').prepend(newInput)
        $('.tool_execution_form').prepend(newLabel)
  )

  # Check for inputs that are no longer args
  $('.tool_execution_form input[name^="args"]').each ->
    found = false

    input = $(this)
    label = $("label[for='"+input.attr('id')+"']")

    args.forEach (arg, index, arr) ->
      if input.attr('name') == "args["+arg+"]"
        found = true

    unless found
      input.remove()
      label.remove()

$(document).ready ->

  $('textarea').acedInitTA({theme: 'github', mode: 'python'})

  editor = $('.ace_editor').aced()
  editor.getSession().on('change', (e)->
    inputs = findInputs(editor.getValue())
    updateInputs(inputs)
  )

  $('.tool_execution_form').append("<input name='code' type='hidden'>")

  $('.tool_execution_form').submit (e)->
    e.preventDefault()
    $('#result pre').html('<img src="/spinner.gif">')

    $('.tool_execution_form input[name="code"]').val(editor.getValue())

    $.post '/api/execute', $('.tool_execution_form').serialize(), (data)->

      $('#result pre').html(data.result)
