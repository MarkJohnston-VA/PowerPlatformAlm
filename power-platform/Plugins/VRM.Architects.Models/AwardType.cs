using System;

namespace VRM.Architects.Models
{
    public class AwardType
    {
        public string Name { get; set; }
        public DateTime CreateOn { get; set; }
        public Guid CreatedBy { get; set; }
        public string CreatedByName { get; set; }
    }

}

