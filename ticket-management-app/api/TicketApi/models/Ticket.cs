using System;
using System.Collections.Generic;

namespace TicketApi.Models
{
    public class Ticket
    {
        public string Id { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public string Queue { get; set; }
        public string StartDate { get; set; }
        public string StartTime { get; set; }
        public string Responsible { get; set; }
        public Requester Requester { get; set; }
        public Location Location { get; set; }
        public List<Communication> Communication { get; set; }
        public List<Repair> Repairs { get; set; }
        public List<Equipment> Equipment { get; set; }
        public List<Infrastructure> Infrastructure { get; set; }
        public List<History> History { get; set; }
    }

    public class Requester
    {
        public string Name { get; set; }
        public string Cellphone { get; set; }
        public string Phone { get; set; }
    }

    public class Location
    {
        public string Name { get; set; }
        public string Region { get; set; }
        public string Complement { get; set; }
    }

    public class Communication
    {
        public string Date { get; set; }
        public string Message { get; set; }
        public string Time { get; set; }
        public string UserName { get; set; }
    }

    public class Repair
    {
        public string EndDate { get; set; }
        public Equipment Equipment { get; set; }
        public string Date { get; set; }
        public string Description { get; set; }
        public string StartDate { get; set; }
        public string Status { get; set; }
        public string WorkBench { get; set; }
    }

    public class Equipment
    {
        public string Name { get; set; }
        public string SealNumber { get; set; }
        public string SerialNumber { get; set; }
        public string Status { get; set; }
        public string Type { get; set; }
    }

    public class Infrastructure
    {
        public string MeasurementUnit { get; set; }
        public int Quantity { get; set; }
        public string Service { get; set; }
        public string Status { get; set; }
    }

    public class History
    {
        public string Date { get; set; }
        public string Event { get; set; }
        public string User { get; set; }
    }

}