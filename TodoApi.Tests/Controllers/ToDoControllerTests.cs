using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Moq;
using TodoApi.Controllers;
using TodoApi.Models;
using TodoApi.Services;
using Xunit;

namespace TodoApi.Tests.Controllers
{
    public class ToDoControllerTests
    {
        private readonly TodoController _controller;

        public ToDoControllerTests()
        {
            _controller = new TodoController();
        }

        [Fact]
        public void GetTodos_ShouldReturnOkResult_WithListOfTodos()
        {
            var result = _controller.GetTodos();

            
            var actionResult = Assert.IsType<ActionResult<IEnumerable<TodoItem>>>(result);
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            Assert.IsType<List<TodoItem>>(okResult.Value);
        }

        [Fact]
        public void AddTodo_ShouldReturnCreatedAtAction()
        {
            var testTodoItemName = "Test new Todo";
            var newTodo = new TodoItem { Text = testTodoItemName, Completed = false };

            var result = _controller.AddTodoItem(newTodo);

            var actionResult = Assert.IsType<ActionResult<TodoItem>>(result);
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(actionResult.Result);
            var returnTodo = Assert.IsType<TodoItem>(createdAtActionResult.Value);
            Assert.Equal(testTodoItemName, returnTodo.Text);
        }

        
    }
}
