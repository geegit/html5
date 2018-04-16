//Lesson 1: You Have 2 types of Comments Below

//This type of comment, comments exactly 1 line
//This is another comment line
//
//
//
//   This is all commented out
//
//
//
/*
	This is a group comment

	This is all grey and a comment because it is a group comment. Group comments are useful
	when I want to comment many lines of code or document many.


*/

// Lesson 2: 8 Basic Java types
// https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html
// This is referring to the basic types or primitives
// boolean, the type whose values are either true or false.
// char, the character type whose values are 16-bit Unicode characters.
// the arithmetic types: the integral types: byte. short. int. long. the floating-point types: float. double.
public class iMadeUpAName(){

	boolean playing = true;

	if(playing){
		wait();
	} else {
		makeBasketballPlayerBlink();
	}

	//Can only contain one character at a time
	char mychar = 'A';

	short myshort = 32768;

	int mynum = 494949444;

	long mylong = 1008808383;

	double mydouble = 10.5;

	float myfloat = 10.5;

	//Conversation
	String helloQuestion = "Hello, who are you?";

	String minMaxQuestion = "Pick a number between 1 and 3";

	System.out.println(helloQuestion);

	//Wait for answer.  console.readLine()

	System.out.println(minMaxQuestion);

	//Wait for answer.  console.readLine()


}
