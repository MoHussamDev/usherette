

// // function token (){
// //     var tok = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
// // return tok
// // }
 

// function editUserLink(){
//     var link ="/admin/addnewuser/emailcheckupdate/"
//     var id;
//     if(document.querySelector('input[name="id"]') === null){
//         id = 1;
//     }else{
//         id=document.querySelector('input[name="id"]').getAttribute('value')
//     }
//     var newLink = link + id
//     return newLink;
// }

// $(function(){

//     $('#loginPopForm').validate({
//         rules:{
//             email:{
//                 required:true,
//                 email:true,
//                 remote: {
//                     url: "/admin/addnewuser/emailcheck",
//                     type: "POST",
//                     beforeSend: function(request) {
//                                 request.setRequestHeader("CSRF-Token", token());
//                             },

//                 }
//                 },
//             firstname:{
//                 required:true
//             },
//             lastname:{
//                 required:true
//             },
//             password:{
//                 required:true
//             },
//             retypePassword:{
//                 required:true,
//                 equalTo:"#password"

//             }
//         },
//         messages:{
//             email:{
//                 required:'please Enter Email Address',
//                 email:'please Enter A Valid Email Address',
//                 remote:'This Email In Use Provide Another Email'
//             },
//             firstname:{
//                 required:'please Enter Firstname',
//             },
//             lastname:{
//                 required:'please Enter lastname',
//             },
//             password:{
//                 required:'please Enter password',
//             },
//             retypePassword:{
//                 required:'please Enter password',
//                 equalTo:'please Check if the Password Match',
//             }
//         }

//     })
// });



// $(function(){

//     $('#editUser').validate({
//         rules:{
//             email:{
//                 required:true,
//                 email:true,
//                 remote: {
//                     url: editUserLink(),
//                     type: "POST",
//                     beforeSend: function(request) {
//                                 request.setRequestHeader("CSRF-Token", token());
//                             },

//                 }
//             },
//             firstname:{
//                 required:true
//             },
//             lastname:{
//                 required:true
//             },

//         },
//         messages:{
//             email:{
//                 required:'please Enter Email Address',
//                 email:'please Enter A Valid Email Address',
//                 remote:'This Email In Use Provide Another Email'
//             },
//             firstname:{
//                 required:'please Enter Firstname',
//             },
//             lastname:{
//                 required:'please Enter lastname',
//             },

//         }

//     })
// });
// $(function(){

//     $('#changePassword').validate({
//         rules:{
//             oldPassword:{
//                 required:true,
//             },
//             newPassword:{
//                 required:true
//             },
//             retypeNewPassword:{
//                 required:true,
//                 equalTo:"#newPassword"
//             },

//         },
//         messages:{
//             oldPassword:{
//                 required:'please Enter Your Old Password ',

//             },
//             newPassword:{
//                 required:'please Enter Your new Password',
//             },
//             retypeNewPassword:{
//                 required:'please Enter Your new Password',
//             },

//         }

//     })
// });

// $("#imageUpload").on('change', function(){
//     var upImage = $("#imageUpload")
//     uplImage = upImage[0].files[0]
//     if (!uplImage.type.startsWith('image/')){
//         return console.log("err")
//     }
//     var reader = new FileReader();
//     reader.onload = function(e) {
//         $('#imgDisplay').attr('src', e.target.result);
//       }
//       reader.readAsDataURL(uplImage);

//     console.log(upImage[0].files[0])

// });
// $("#updateImage").on('change', function(){
//     var upImage = $("#updateImage")
//     uplImage = upImage[0].files[0]
//     if (!uplImage.type.startsWith('image/')){
//         return console.log("err")
//     }
//     var reader = new FileReader();
//     reader.onload = function(e) {
//         $('#dispUpImage').attr('src', e.target.result);
//       }
//       reader.readAsDataURL(uplImage);

//     console.log(upImage[0].files[0])

// });





// // $.ajax({
// //     type: "POST",
// //     beforeSend: function(request) {
// //         request.setRequestHeader("CSRF-Token", token);
// //       request.setRequestHeader("Content-Type", 'application/json');

// //     },
// //     url: "/admin/addnewuser/emailcheck",
// //     data: JSON.stringify({email:'mohamed@mohamed.com'}),
// //     processData: false,
// //     success: function(msg) {
// //       console.log(msg)
// //     }
// //   });


// // jQuery.ajax({
// //     url : '/admin/addnewuser/emailcheck',
// //     type: 'POST',
// //     data: {email: "mohamed@mohamed.com"},
// //     // beforeSend: function(xhr){xhr.setRequestHeader('CSRF-Token', 'token')},
// //   });
