using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using TicketApi.Models;


namespace TicketApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TicketsController : ControllerBase
    {
        private static List<Ticket> _tickets = new List<Ticket>(); // In-Memory data store

        // GET: api/tickets
        [HttpGet]
        public ActionResult<IEnumerable<Ticket>> GetTickets()
        {
            return Ok(_tickets);
        }

        // GET: api/tickets/{id}
        [HttpGet("{id}")]
        public ActionResult<Ticket> GetTicket(string id)
        {
           var ticket = _tickets.FirstOrDefault(t => t.Id == id);
            if (ticket == null)
            {
                return NotFound();
            }
            return Ok(ticket);
        }

        // POST: api/tickets
        [HttpPost]
        public ActionResult<Ticket> CreateTicket([FromBody] Ticket ticket)
        {
             if (ticket == null)
            {
                return BadRequest("Invalid ticket data.");
            }

             ticket.Id = Guid.NewGuid().ToString();
            _tickets.Add(ticket);
            return CreatedAtAction(nameof(GetTicket), new { id = ticket.Id }, ticket); // Return 201
        }

        // PUT: api/tickets/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateTicket(string id, [FromBody] Ticket updatedTicket)
        {
           var existingTicket = _tickets.FirstOrDefault(t => t.Id == id);
            if (existingTicket == null)
            {
                return NotFound();
            }
             // Keep existing id and replace other fields
            updatedTicket.Id = existingTicket.Id;
            _tickets[_tickets.IndexOf(existingTicket)] = updatedTicket;

            return NoContent(); // Return 204
        }

        // DELETE: api/tickets/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteTicket(string id)
        {
            var ticket = _tickets.FirstOrDefault(t => t.Id == id);
            if (ticket == null)
            {
                return NotFound();
            }

            _tickets.Remove(ticket);

            return NoContent(); // Return 204
        }
    }
}