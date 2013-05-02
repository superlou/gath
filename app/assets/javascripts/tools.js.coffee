# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

$(document).ready ->

  $('.tool_execution_form').append("<input name='code' type='hidden'>")

  $('.tool_execution_form').submit (e)->
    e.preventDefault()
    $('#result pre').html('<img src="/spinner.gif">')

    # Update form with current code
    editor = $('.ace_editor').aced()
    $('.tool_execution_form input[name="code"]').val(editor.getValue())

    $.post '/api/execute', $('.tool_execution_form').serialize(), (data)->

      $('#result pre').html(data.result)
