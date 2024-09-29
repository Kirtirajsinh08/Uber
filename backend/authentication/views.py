from rest_framework import status
from rest_framework.decorators import api_view, permission_classes

from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication

User = get_user_model()

# Register view - accepting JSON data
@api_view(['GET'])
def user_status(request):
    return Response({'authenticated' : request.user.is_authenticated})


@api_view(['POST'])
@csrf_exempt
def register_view(request):
    try:
        data = request.data
        email = data['email']
        first_name = data['first_name']
        last_name = data['last_name']
        password = data['password']
        phone_number = data.get('phone_number', None)
        user_type = data['user_type']

        if user_type not in ['driver', 'rider']:
            return Response({'error': 'Invalid user type'})

        if User.objects.filter(email=email).exists():
            return Response({'error': 'Email already exists'})

        user = User.objects.create_user(
            email=email, 
            first_name=first_name, 
            last_name=last_name, 
            password=password, 
            phone_number=phone_number, 
            user_type=user_type
        )
        token = Token.objects.create(user = user)
        login(request, user)
        return Response({'message': 'User registered successfully','token': token.key, 'type': user.user_type, 'user_id':user.id})

    except KeyError as e:
        print(str(e))
        return Response({'error': f'Missing field {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
    

# Login view - accepting JSON data
@api_view(['POST', 'GET'])
@csrf_exempt
def login_view(request):
    if request.method == "GET":
        authentication_classes = (TokenAuthentication,)
        token = request.headers.get('Authorization')
        print(token)
        if not token:
            return Response(data={'error':'No Token. Authorization Denied'})


                  
        user = User.objects.get(id=request.user.id)
        return Response({'message': 'success'})
    elif request.method == "POST":
        try:
            data = request.data
            email = data['email']
            password = data['password']
            print(User.objects.all())
            user = authenticate(request, email=email, password=password)
            if user is not None:
                login(request, user)
                return Response({'message': 'Logged in successfully', 'type': user.user_type, 'user_id':user.id}, status=status.HTTP_200_OK)
            else:
                print({'error': 'Invalid email or password'})
                return Response({'error': 'Invalid email or password'})

        except KeyError as e:
            return Response({'error': f'Missing field {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)

# Logout view - requires authentication
# @permission_classes([IsAuthenticated])

@api_view(['POST'])
def logout_view(request):
    try:
        # Perform the logout
        logout(request)
        return Response({'message': 'Logged out successfully'}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

# Check email view - to check if email already exists
@api_view(['POST'])
@csrf_exempt
def check_email_view(request):
    try:
        data = request.data
        email = data['email']

        if User.objects.filter(email=email).exists():
            return Response({'exists': True}, status=status.HTTP_200_OK)
        else:
            return Response({'exists': False}, status=status.HTTP_200_OK)

    except KeyError as e:
        return Response({'error': f'Missing field {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)