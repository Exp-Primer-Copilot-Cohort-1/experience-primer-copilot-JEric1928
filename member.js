function skillsMember(){
    var member = {
        name: "John",
        age: 30,
        skills: ["Javascript", "React", "Node"],
        showSkills: function(){
            this.skills.forEach(function(skill){
                console.log(`${this.name} knows ${skill}`);
            }, this);
        }
    };
    member.showSkills();
}