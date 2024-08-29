using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TodoApi.Models;

namespace TodoApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : ControllerBase
    {
        private static List<TodoItem> Todos =
        [
            new TodoItem { Id = 1, Text = "Sample Todo 1", Completed = false }
        ];

        [HttpGet]
        public ActionResult<IEnumerable<TodoItem>> GetTodos()
        {
            return Ok(Todos);
        }

        [HttpPost]
        public ActionResult<TodoItem> AddTodoItem(TodoItem newTodo)
        {
            newTodo.Id = Todos.Count != 0 ? Todos.Max(t => t.Id) + 1 : 1;
            Todos.Add(newTodo);
            return CreatedAtAction(nameof(GetTodos), new { id = newTodo.Id }, newTodo);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateTodoItem(int id, TodoItem updatedTodo)
        {
            var existingTodo = Todos.FirstOrDefault(t => t.Id == id);
            if (existingTodo == null) return NotFound();

            existingTodo.Text = updatedTodo.Text;
            existingTodo.Completed = updatedTodo.Completed;
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTodoItem(int id)
        {
            var todo = Todos.FirstOrDefault(t => t.Id == id);
            if (todo == null) return NotFound();

            Todos.Remove(todo);
            return NoContent();
        }
    }
}
